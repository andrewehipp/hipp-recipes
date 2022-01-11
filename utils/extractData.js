import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import safeJSONStringify from 'safe-json-stringify';

const getIdAndFields = ({
  sys: {
    updatedAt = '',
    contentType: { sys: { id: contentTypeId = null } = {} } = {},
  } = {},
  fields = {},
}) => {
  return {
    contentTypeId,
    updatedAt,
    ...fields,
  };
};

const isImage = /^image\//;

const getFileFields = (file) => {
  if (!file) return undefined;

  const { file: { url, details, fileName, contentType } = {}, ...rest } = file;

  if (contentType.match(isImage)) {
    const { size, image: { width, height } = {} } = details;

    return {
      url,
      size,
      width,
      height,
      fileName,
      contentType,
      ...rest,
    };
  }

  return file;
};

const getContentData = (content) => {
  if (!content) return undefined;

  // Ignore strings
  if (isString(content)) return content;

  const contentData = getIdAndFields(content);

  // If we're working with a contentful image object parse it.
  if (contentData.file) return getFileFields(contentData);

  // If we're dealing with any other object recursively resolve all it's values.
  return Object.keys(contentData).reduce((acc, cur) => {
    const curContentData = contentData[cur];

    if (isArray(curContentData))
      return {
        ...acc,
        // I'm parsing the contentful data here on purpose. This lets me go 1 level deeper before
        // getting "['Circular']" from safeJSONStringify when a loop happens
        [cur]: curContentData.map((data) =>
          getContentData(JSON.parse(safeJSONStringify(data))),
        ),
      };

    if (
      isObject(curContentData) &&
      (curContentData.fields || curContentData.sys)
    )
      return {
        ...acc,
        // I'm parsing the contentful data here on purpose. This lets me go 1 level deeper before
        // getting "['Circular']" from safeJSONStringify when a loop happens
        [cur]: getContentData(JSON.parse(safeJSONStringify(curContentData))),
      };

    return {
      ...acc,
      [cur]: curContentData,
    };
  }, {});
};

export { getIdAndFields, getFileFields, getContentData };
