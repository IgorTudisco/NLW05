// responsible for settings

import { Repository, EntityRepository } from "typeorm";

import { Setting } from "../entities/Setting";

// Extend for type Setting that is my entities type.

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {};

export { SettingsRepository };