import chalk from 'chalk';

const __DEV__ = true;

const log = (arg = '') => {
    if (__DEV__ === true) console.log(arg);
};
log.GET = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.green('[GET]')}\t\t${arg}`);
};
log.POST = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.blue('[POST]')}\t\t${arg}`);
};
log.PUT = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.cyan('[PUT]')}\t\t${arg}`);
};
log.DELETE = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.red('[DELETE]')}\t${arg}`);
};
log.work = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.yellow('[WORK]')}\t\t${arg}`);
}
log.create = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.yellow('[CREATE]')}\t\t${arg}`);
}
log.connect = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.green('[CONNECT]')}\t${arg}`);
}
log.db = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.green('[MongoDB]')}\t${arg}`);
}
log.ERROR = (arg) => {
    if (__DEV__ === true) console.log(`${chalk.red(`[ERROR]\t\t${arg}`)}`);
};

module.exports = log;