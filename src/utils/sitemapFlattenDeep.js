import convert from 'xml-js';
import axios from 'axios';
import get from 'lodash/get';
import Bluebird from 'bluebird';
import flattenDeep from 'lodash/flattenDeep';

const isSitemap = (url) => /.*.xml$/.test(url);
const isTarget = (url) => /^https:\/\/.*$/.test(url);

const getSitemap = async (url) => {
  const { data } = await axios.get(url);

  const json = convert.xml2json(data);
  const { elements } = JSON.parse(json);

  const type = get(elements, '[0].name', undefined);
  if (type === 'sitemapindex') return getElements(elements);
  return url;
};

const getElements = async (elements) => {
  return Bluebird.map(elements, async (element) => {
    if (element.elements) return getElements(element.elements);
    if (isSitemap(element.text)) return getSitemap(element.text);
    if (isTarget(element.text)) return element.text;
    return 0;
  });
};

const getSitemapElements = async (data) => {
  const json = convert.xml2json(data);
  const { elements } = JSON.parse(json);
  return getElements(elements);
};

const sitemapFlattenDeep = async (data) => {
  const sitemapElements = await getSitemapElements(data);
  const elementsJSON = flattenDeep(sitemapElements).filter(Boolean);
  // console.log(elementsJSON);
  const elementsXML = elementsJSON.map((elem) => ({
    type: "element",
    name: "sitemap",
    elements: [
      {
        type: "element",
        name: "loc",
        elements: [
          {
            type: "text",
            text: elem,
          },
        ],
      },
    ],
  }));

  const pattern = {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'sitemapindex',
        attributes: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd',
        },
        elements: elementsXML,
      },
    ],
  };
  const options = { compact: false, ignoreComment: true };
  
  return convert.js2xml(pattern, options);
};

module.exports = sitemapFlattenDeep;