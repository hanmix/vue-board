export enum RouteName {
  HOME = 'home',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  BOARD = 'board',
  NOTICE = 'notice',
  FREE = 'free',
  BOARD_DETAIL = 'board-detail',
  USERPROFILE = 'userprofile',
  MYPOSTS = 'myposts',
}

export enum BoardType {
  ALL = '',
  NOTICE = 'notice',
  FREE = 'free',
}

// BoardType과 RouteName 매핑
const BOARD_ROUTE_MAP = new Map([
  [BoardType.NOTICE, RouteName.NOTICE],
  [BoardType.FREE, RouteName.FREE],
  [BoardType.ALL, RouteName.FREE], // 기본값
]);

// 역방향 매핑 (RouteName -> BoardType)
const ROUTE_BOARD_MAP = new Map([
  [RouteName.NOTICE, BoardType.NOTICE],
  [RouteName.FREE, BoardType.FREE],
]);

/**
 * BoardType을 기반으로 RouteName을 반환합니다
 */
export const getBoardRouteName = (boardType: BoardType): RouteName => {
  return BOARD_ROUTE_MAP.get(boardType) || RouteName.FREE;
};

/**
 * RouteName을 기반으로 BoardType을 반환합니다
 */
export const getBoardTypeFromRoute = (routeName: RouteName): BoardType => {
  return ROUTE_BOARD_MAP.get(routeName) || BoardType.ALL;
};

/**
 * 경로에서 BoardType을 추출합니다
 */
export const getBoardTypeFromPath = (path: string): BoardType => {
  if (path.startsWith('/board/notice')) return BoardType.NOTICE;
  if (path.startsWith('/board/free')) return BoardType.FREE;
  return BoardType.ALL;
};
