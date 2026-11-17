"""生成多语的应用图标（吉祥物小橘）。用法: python tools/make-icons.py"""
import math
import os

import numpy as np
from PIL import Image, ImageDraw

S = 2048
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'icons')


def background():
    t = np.linspace(0, 1, S)[:, None, None]
    top = np.array((255, 247, 232), float)[None, None, :]
    bot = np.array((255, 222, 184), float)[None, None, :]
    arr = np.repeat(top * (1 - t) + bot * t, S, axis=1)
    return Image.fromarray(arr.astype('uint8'), 'RGB').convert('RGBA')


def leaf(d, bx, by, length, width, angle, color, n=90):
    ca, sa = math.cos(angle), math.sin(angle)
    a, b = [], []
    for i in range(n + 1):
        u = i / n
        w = width * (math.sin(math.pi * u ** 0.85) ** 0.9)
        x = u * length
        a.append((bx + x * ca - w * sa, by + x * sa + w * ca))
        b.append((bx + x * ca + w * sa, by + x * sa - w * ca))
    d.polygon(a + b[::-1], fill=color)


def mascot(scale):
    """在透明画布上画小橘，scale 是身体半径占画布的比例。"""
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx, cy = S / 2, S / 2 + S * scale * 0.18
    r = S * scale
    k = r / 42.0  # 与网页里 SVG 的坐标（半径 42）对应
    ox, oy = cx - 60 * k, cy - 68 * k

    def P(x, y):
        return (ox + x * k, oy + y * k)

    ink = (74, 42, 18, 255)
    # 叶柄和叶子
    d.line([P(60, 28), P(61, 20), P(65, 9)], fill=(122, 82, 48, 255), width=int(4.5 * k), joint='curve')
    leaf(d, *P(64, 17), 36 * k, 10 * k, math.radians(-14), (76, 194, 58, 255))
    # 身体
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 154, 46, 255))
    # 高光
    hl = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    hd = ImageDraw.Draw(hl)
    hx, hy = P(42, 46)
    hd.ellipse([hx - 12 * k, hy - 7 * k, hx + 12 * k, hy + 7 * k], fill=(255, 194, 122, 255))
    hl = hl.rotate(32, center=(hx, hy), resample=Image.BICUBIC)
    im.alpha_composite(hl)
    d = ImageDraw.Draw(im)
    tx, ty = P(60, 28)
    d.ellipse([tx - 3.5 * k, ty - 3.5 * k, tx + 3.5 * k, ty + 3.5 * k], fill=(217, 120, 15, 255))
    # 脸颊
    for x in (33, 87):
        ex, ey = P(x, 78)
        d.ellipse([ex - 7 * k, ey - 4.5 * k, ex + 7 * k, ey + 4.5 * k], fill=(255, 120, 100, 150))
    # 眼睛
    for x in (45, 75):
        ex, ey = P(x, 63)
        d.ellipse([ex - 6.5 * k, ey - 6.5 * k, ex + 6.5 * k, ey + 6.5 * k], fill=ink)
        gx, gy = P(x + 2, 61)
        d.ellipse([gx - 2.2 * k, gy - 2.2 * k, gx + 2.2 * k, gy + 2.2 * k], fill=(255, 255, 255, 255))
    # 微笑
    rr = 2.6 * k
    for i in range(301):
        u = i / 300
        p = P(49 + 22 * u, 77 + 22 * u * (1 - u))
        d.ellipse([p[0] - rr, p[1] - rr, p[0] + rr, p[1] + rr], fill=ink)
    return im


def make(scale, size, name):
    im = background()
    im.alpha_composite(mascot(scale))
    im.convert('RGB').resize((size, size), Image.LANCZOS).save(os.path.join(OUT, name))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for size in (180, 192, 512):
        make(0.33, size, 'icon-%d.png' % size)
    make(0.26, 512, 'icon-maskable-512.png')
    make(0.40, 32, 'icon-32.png')
    print('icons written to', os.path.normpath(OUT))
