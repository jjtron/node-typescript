import { logger } from "./index";

export function reportMemoryUsage() {
    const used = process.memoryUsage();
    for (let key in used) {
        logger.debug(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
}