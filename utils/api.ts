import axios from 'axios';
import { NextRouter } from 'next/router';
import { RecordType } from './constants';
import {
  ACTIVITIES_PATH,
  DELETE_ACTIVITY_API_PATH,
  DELETE_MEAL_API_PATH,
  DELETE_VITAL_API_PATH,
  MEALS_PATH,
  VITALS_PATH
} from './routing';

const pathsMap = {
  [RecordType.ACTIVITY]: {
    deletePath: DELETE_ACTIVITY_API_PATH,
    callbackUrl: ACTIVITIES_PATH
  },
  [RecordType.MEAL]: {
    deletePath: DELETE_MEAL_API_PATH,
    callbackUrl: MEALS_PATH
  },
  [RecordType.VITAL]: {
    deletePath: DELETE_VITAL_API_PATH,
    callbackUrl: VITALS_PATH
  }
};

export async function deleteRecord(
  id: string,
  recordType: RecordType,
  router: NextRouter
) {
  if (window.confirm(`Are you sure you want to delete this ${recordType}?`)) {
    const { deletePath, callbackUrl } = pathsMap[recordType];
    const params = { id };
    await axios.post(deletePath, params);
    router.push(callbackUrl);
  }
}
