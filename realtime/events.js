function userJoined({ userId, workspaceId }) {
  return {
    type: 'USER_JOINED',
    payload: { userId, workspaceId },
  };
}

function fileChanged({ file, content }) {
  return {
    type: 'FILE_CHANGED',
    payload: { file, content },
  };
}

module.exports = { userJoined, fileChanged };
