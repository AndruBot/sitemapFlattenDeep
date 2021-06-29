import { AsyncRouter } from 'express-async-router';
import axios from 'axios';

import { Logger, sitemapFlattenDeep } from '../utils';

const router = AsyncRouter();
const BASE_URL = 'https://buzzguru.com/sitemap.xml';

router.get('/parse', async (req, res) => {
    Logger.GET(`/parse`);
    const { data: sitemap } = await axios.get(BASE_URL);
    const result = await sitemapFlattenDeep(sitemap);

    return res.send(result);
});

module.exports = router;