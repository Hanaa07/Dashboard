
export const apiEndPoint = (endPoint: string) => {
    const baseUrl = 'http://192.168.2.82:8000/api';

    return `${baseUrl}${endPoint}`;
}
