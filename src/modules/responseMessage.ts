const message = {
  /* common */
  NULL_VALUE: "필요한 값이 없습니다.",
  NOT_FOUND: "존재하지 않는 자원",
  BAD_REQUEST: "잘못된 요청",
  INTERNAL_SERVER_ERROR: "서버 내부 오류",

  /* user */
  EMAIL_DUPLICATED: "이메일 중복",
  NULL_VALUE_TOKEN: "토큰 없음",
  INVALID_TOKEN: "토큰 만료",
  INVALID_PASSWORD: "비밀번호 오류",
  SIGNIN_USER_SUCCESS: "로그인 성공",
  NO_USER: "존재하지 않는 유저",
  EXPIRED_TOKEN: "만료된 토큰입니다.",

  CREATE_USER_SUCCESS: "유저 회원가입 성공",
  READ_USER_SUCCESS: "유저 정보 조회 성공",

  /* place */
  READ_PLACE_SUCCESS: "장소 조회 성공",
  READ_CATEGORY_PLACES_FAIL: "카테고리별 장소 리스트 조회 실패",
  READ_CATEGORY_PLACES_SUCCESS: "카테고리별 장소 리스트 조회 성공",
  SEARCH_PLACE_SUCCESS: "장소 검색 성공",

  /* report */
  CREATE_REPORT_SUCCESS: "장소 제보 성공",
  READ_REPORT_SUCCESS: "제보 조회 성공",
};

export default message;
