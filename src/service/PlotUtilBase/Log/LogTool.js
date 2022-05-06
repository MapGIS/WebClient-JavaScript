import { LogBase } from "./LogBase";

/**
 * 日志工具类
 */
export class LogTool{
    static error()
    {
        LogTool.logger.error(...arguments);
    }

    static warn()
    {
        LogTool.logger.warn(...arguments)
    }

    static info()
    {
        LogTool.logger.info(...arguments)
    }

    static debug()
    {
        LogTool.logger.debug(...arguments)
    }

}

LogTool.logger=new LogBase();