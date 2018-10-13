export const CONFIRM = 'CONFIRM';

export function confirm(content, title) {
    return {
        type: CONFIRM,
        payload: { content, title }
    }
}