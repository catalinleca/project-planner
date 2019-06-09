import {ProjectPhase, TaskStatus} from "../types/types";
import {Map} from "immutable";

export const PROJECT_LIST = '/projectList';
export const MATA = '/mata';
export const PROJECT_DETAILS = `${PROJECT_LIST}/details`;



export const projectPhases: ProjectPhase[] = ['initial', 'planning', 'execution', 'closure'];

const keys = Object.keys(TaskStatus);
export const taskStatusValues = Map().withMutations( taskStatuses => {
  keys.forEach( key => {
    taskStatuses.set(key, TaskStatus[key])
  })
});