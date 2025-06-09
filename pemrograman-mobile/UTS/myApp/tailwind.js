// tailwind.js
import { create } from 'twrnc';

const tw = create({
    theme: {
        extend: {
            colors: {
                army: '#3C5B45',
                leaf: '#A5C9A1',
                tanah: '#8B5E3C',
                dark: '#1E2D24',
            },
        },
    },
});
export default tw;