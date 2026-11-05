// 프로젝트 이름 끝의 역할 표기. 여러 개면 쉼표로 나눈다. 예) "주식 정보 조회 앱 개발 (Backend, DBA)"
const devRoleNames = ["Frontend", "Backend", "DBA"];

// 이름과 역할 목록을 나눈다. 괄호 안이 모두 역할이 아니면 이름을 그대로 두고 roles는 빈 배열이다.
export function splitDevRoles(name: string): { title: string; roles: string[] } {
  const m = name.match(/^(.*?)\s*\(([^)]+)\)$/);
  if (!m) return { title: name, roles: [] };
  const roles = m[2].split(",").map((r) => r.trim());
  return roles.every((r) => devRoleNames.includes(r)) ? { title: m[1], roles } : { title: name, roles: [] };
}
