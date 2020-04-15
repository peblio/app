import { DEFAULT_PAGE_TITLE, SNAPSHOT_DEFAULT_IMG } from '../constants/pageConstants';

function buildCommonPageData(props) {
  return {
    heading: props.pageHeading,
    description: props.description,
    editors: props.editors,
    editorIndex: props.editorIndex,
    layout: props.layout,
    workspace: props.workspace,
    tags: props.tags,
  };
}

function getPageTitle(props) {
  if (props.pageHeading !== '' && props.pageTitle === DEFAULT_PAGE_TITLE) {
    return props.pageHeading;
  }
  return props.pageTitle;
}

export function buildRawPageDataForSave(props) {
  return {
    ...buildCommonPageData(props),
    parentId: '',
    title: getPageTitle(props),
    isPublished: !(props.userType === 'student') || props.isPeblPublished,
    snapshotPath: SNAPSHOT_DEFAULT_IMG
  };
}

export function buildRawPageDataForUpdate(props) {
  return {
    ...buildCommonPageData(props),
    id: props.id,
    title: getPageTitle(props),
    isPublished: !(props.userType === 'student') || props.isPeblPublished,
  };
}

export function buildPageDataForRemixing(props) {
  return {
    ...buildCommonPageData(props),
    parentId: props.id,
    title: `${props.pageTitle}-copy`,
    isPublished: true,
    snapshotPath: SNAPSHOT_DEFAULT_IMG
  };
}
