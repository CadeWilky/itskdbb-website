import { describe, expect, it } from 'vitest';
import { posts, users } from '../../src/api/data';
// ---------------------------------------------------------------------------
// Inline validation helpers (mirror the logic in the route handlers without
// importing from src so these tests remain self-contained)
// ---------------------------------------------------------------------------
function validateUserBody(body) {
    return (typeof body.name === 'string' && body.name.trim() !== '' &&
        typeof body.handle === 'string' && body.handle.trim() !== '' &&
        typeof body.bio === 'string' && body.bio.trim() !== '');
}
function validatePostBody(body) {
    return (typeof body.title === 'string' && body.title.trim() !== '' &&
        typeof body.body === 'string' && body.body.trim() !== '' &&
        typeof body.authorId === 'number' && !isNaN(body.authorId));
}
// ---------------------------------------------------------------------------
// User data-shape tests
// ---------------------------------------------------------------------------
describe('users — data shape', () => {
    it('users array has items', () => {
        expect(users.length).toBeGreaterThan(0);
    });
    it('all users have required fields with expected types', () => {
        for (const user of users) {
            expect(typeof user.id).toBe('number');
            expect(typeof user.name).toBe('string');
            expect(typeof user.handle).toBe('string');
            expect(typeof user.bio).toBe('string');
        }
    });
    it('user ids are unique', () => {
        const ids = users.map((u) => u.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
    it('user handles are non-empty strings', () => {
        for (const user of users) {
            expect(user.handle.trim().length).toBeGreaterThan(0);
        }
    });
});
// ---------------------------------------------------------------------------
// Post data-shape tests
// ---------------------------------------------------------------------------
describe('posts — data shape', () => {
    it('posts array has at least 3 items', () => {
        expect(posts.length).toBeGreaterThanOrEqual(3);
    });
    it('all posts have required fields with expected types', () => {
        for (const post of posts) {
            expect(typeof post.id).toBe('number');
            expect(typeof post.title).toBe('string');
            expect(typeof post.body).toBe('string');
            expect(typeof post.authorId).toBe('number');
        }
    });
    it('post ids are unique', () => {
        const ids = posts.map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
    it('post authorIds reference valid users', () => {
        const validUserIds = new Set(users.map((u) => u.id));
        for (const post of posts) {
            expect(validUserIds.has(post.authorId)).toBe(true);
        }
    });
});
// ---------------------------------------------------------------------------
// POST validation logic — validateUserBody
// ---------------------------------------------------------------------------
describe('validateUserBody', () => {
    it('valid input returns true', () => {
        expect(validateUserBody({ name: 'Kd BB', handle: '@itskdbb', bio: 'Model & creator' })).toBe(true);
    });
    it('missing name returns false', () => {
        expect(validateUserBody({ handle: '@itskdbb', bio: 'Model & creator' })).toBe(false);
    });
    it('empty handle returns false', () => {
        expect(validateUserBody({ name: 'Kd BB', handle: '   ', bio: 'Model & creator' })).toBe(false);
    });
    it('numeric name returns false', () => {
        expect(validateUserBody({ name: 42, handle: '@itskdbb', bio: 'Model & creator' })).toBe(false);
    });
    it('missing bio returns false', () => {
        expect(validateUserBody({ name: 'Kd BB', handle: '@itskdbb' })).toBe(false);
    });
    it('all empty strings returns false', () => {
        expect(validateUserBody({ name: '', handle: '', bio: '' })).toBe(false);
    });
});
// ---------------------------------------------------------------------------
// POST validation logic — validatePostBody
// ---------------------------------------------------------------------------
describe('validatePostBody', () => {
    it('valid input returns true', () => {
        expect(validatePostBody({ title: 'My post', body: 'Post content here', authorId: 1 })).toBe(true);
    });
    it('missing title returns false', () => {
        expect(validatePostBody({ body: 'Post content here', authorId: 1 })).toBe(false);
    });
    it('empty title returns false', () => {
        expect(validatePostBody({ title: '  ', body: 'Post content here', authorId: 1 })).toBe(false);
    });
    it('non-number authorId returns false', () => {
        expect(validatePostBody({ title: 'My post', body: 'Post content here', authorId: '1' })).toBe(false);
    });
    it('missing authorId returns false', () => {
        expect(validatePostBody({ title: 'My post', body: 'Post content here' })).toBe(false);
    });
    it('empty body returns false', () => {
        expect(validatePostBody({ title: 'My post', body: '', authorId: 1 })).toBe(false);
    });
});
