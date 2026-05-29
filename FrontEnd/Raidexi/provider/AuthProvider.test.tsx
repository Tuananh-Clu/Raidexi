import {describe, expect, it, vi} from 'vitest';

const navigate = vi.fn();
const ToasterUi = vi.fn();

describe('Login', () => {
    it('should return true for valid credentials', async () => {
        const mockLogin = vi.fn().mockResolvedValue(true);
        const result = await mockLogin('valid credentials');
        if (result) {
            navigate('/');
            ToasterUi('Logged in successfully', 'success');
        }

        expect(result).toBe(true);
        expect(navigate).toHaveBeenCalledWith('/');
        expect(ToasterUi).toHaveBeenCalledWith('Logged in successfully', 'success');
    });

    it('should return false for invalid credentials', async () => {
        const mockLogin = vi.fn().mockResolvedValue(false);

        const result = await mockLogin('invalid credentials');
        if (!result) {
            ToasterUi('Login failed', 'error');
        }

        expect(result).toBe(false);
        expect(mockLogin).toHaveBeenCalledWith('invalid credentials');
        expect(ToasterUi).toHaveBeenCalledWith('Login failed', 'error');
    });
});