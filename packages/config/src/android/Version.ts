import { ConfigPlugin, ExpoConfig } from '../Config.types';
import { withDangerousAppBuildGradle } from '../plugins/withAndroid';

const DEFAULT_VERSION_NAME = '1.0';
const DEFAULT_VERSION_CODE = '1';

export function getVersionName(config: ExpoConfig) {
  return config.version ?? null;
}

export const withVersionName: ConfigPlugin = config => {
  return withDangerousAppBuildGradle(config, async props => ({
    ...props,
    data: await setVersionName(config.expo, props.data),
  }));
};

export function setVersionName(
  config: ExpoConfig,
  buildGradle: string,
  versionToReplace = DEFAULT_VERSION_NAME
) {
  const versionName = getVersionName(config);
  if (versionName === null) {
    return buildGradle;
  }

  const pattern = new RegExp(`versionName "${versionToReplace}"`);
  return buildGradle.replace(pattern, `versionName "${versionName}"`);
}

export function getVersionCode(config: ExpoConfig) {
  return config.android?.versionCode ? config.android.versionCode : null;
}

export const withVersionCode: ConfigPlugin = config => {
  return withDangerousAppBuildGradle(config, async props => ({
    ...props,
    data: await setVersionCode(config.expo, props.data),
  }));
};

export function setVersionCode(
  config: ExpoConfig,
  buildGradle: string,
  versionCodeToReplace = DEFAULT_VERSION_CODE
) {
  const versionCode = getVersionCode(config);
  if (versionCode === null) {
    return buildGradle;
  }

  const pattern = new RegExp(`versionCode ${versionCodeToReplace}`);
  return buildGradle.replace(pattern, `versionCode ${versionCode}`);
}
