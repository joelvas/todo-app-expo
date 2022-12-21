import { TASKS } from './dbConst'

const CREATE_TABLE_TASKS = `create table if not exists ${TASKS} (id integer primary key not null, done int, value text, createdAt text);`

export { CREATE_TABLE_TASKS }
