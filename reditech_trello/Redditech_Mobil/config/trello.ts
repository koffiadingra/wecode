export const TRELLO_CONFIG = {
  API_KEY: 'aad00c47b6e922959d3dfba660588d7c',
  API_TOKEN: 'ATTA6496901333b87d36b4205265cb83c889e7e14dffe85ba100aaa6a584c3ab09aaFBACF586',
  BASE_URL: 'https://api.trello.com/1',
};

export const TRELLO_ENDPOINTS = {
  GET_BOARDS: `/members/me/boards?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  CREATE_BOARD: `/boards?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  
  GET_LISTS: (boardId: string) => 
    `/boards/${boardId}/lists?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  CREATE_LIST: `/lists?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  
  GET_CARDS: (listId: string) => 
    `/lists/${listId}/cards?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  CREATE_CARD: (listId: string) => 
    `/cards?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}&idList=${listId}`,
  UPDATE_CARD: (cardId: string) => 
    `/cards/${cardId}?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  DELETE_CARD: (cardId: string) => 
    `/cards/${cardId}?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  
  GET_MEMBER: `/members/me?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  GET_BOARD_MEMBERS: (boardId: string) => 
    `/boards/${boardId}/members?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  ADD_MEMBER_TO_CARD: (cardId: string) => 
    `/cards/${cardId}/idMembers?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
  REMOVE_MEMBER_FROM_CARD: (cardId: string, memberId: string) => 
    `/cards/${cardId}/idMembers/${memberId}?key=${TRELLO_CONFIG.API_KEY}&token=${TRELLO_CONFIG.API_TOKEN}`,
};