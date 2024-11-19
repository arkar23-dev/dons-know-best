/* eslint-disable dot-notation */
export const ENVIRONMENTS = {
  local: "http://localhost:3500",
  dev: "https://usfmobileapi.usfca.edu",
  prod: "https://usfmobileapi.usfca.edu",
  undefined: "https://usfmobileapi.usfca.edu"
}

// .ENV NOT WORKING FOR AEK aekdevserver
// Even Sandbox is using prod
export const API_ROOT = ENVIRONMENTS["dev"];

export const CAMPUSM_ASSETS = "https://portal-na.campusm.exlibrisgroup.com/assets/UniversityofSanFrancisco/UniversityofSanFrancisco"
export const CAMPUSM_ASSETS_SANDBOX = "https://portal-na.campusm.exlibrisgroup.com/assets/UniversityofSanFrancisco/UniversityofSanFranciscoSandbox"

export const POOL_LANE_SCHEDULE_FILE = "https://docs.google.com/spreadsheets/d/1VBKi1B9Fndo6WAB8Eg1b4jxHi-AASjwxElkt7QfEepk/edit#gid=300373738"

