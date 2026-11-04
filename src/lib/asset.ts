// next/image는 문자열 src에 basePath를 붙여주지 않으므로 public/ 파일 경로에 직접 붙인다.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
