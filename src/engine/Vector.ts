/** Lightweight 3D vector math utilities for physics */
export class Vec3 {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  clone(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  copy(v: Vec3): Vec3 {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  set(x: number, y: number, z: number): Vec3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  add(v: Vec3): Vec3 {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: Vec3): Vec3 {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiplyScalar(s: number): Vec3 {
    return new Vec3(this.x * s, this.y * s, this.z * s);
  }

  divideScalar(s: number): Vec3 {
    if (s === 0) return new Vec3(0, 0, 0);
    return new Vec3(this.x / s, this.y / s, this.z / s);
  }

  addInPlace(v: Vec3): Vec3 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  subInPlace(v: Vec3): Vec3 {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  scaleInPlace(s: number): Vec3 {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  addScaledInPlace(v: Vec3, s: number): Vec3 {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  normalize(): Vec3 {
    const len = this.length();
    if (len === 0) return new Vec3(0, 0, 0);
    return this.divideScalar(len);
  }

  normalizeInPlace(): Vec3 {
    const len = this.length();
    if (len === 0) { this.set(0, 0, 0); return this; }
    this.x /= len; this.y /= len; this.z /= len;
    return this;
  }

  dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vec3): Vec3 {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  lerp(v: Vec3, t: number): Vec3 {
    return new Vec3(
      this.x + (v.x - this.x) * t,
      this.y + (v.y - this.y) * t,
      this.z + (v.z - this.z) * t
    );
  }

  distanceTo(v: Vec3): number {
    return this.sub(v).length();
  }

  static readonly ZERO = new Vec3(0, 0, 0);
  static readonly UP = new Vec3(0, 1, 0);
  static readonly FORWARD = new Vec3(0, 0, -1);
}

/** Quaternion for 3D rotations */
export class Quat {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {}

  clone(): Quat {
    return new Quat(this.x, this.y, this.z, this.w);
  }

  multiply(q: Quat): Quat {
    return new Quat(
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w,
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
    );
  }

  static fromAxisAngle(axis: Vec3, angle: number): Quat {
    const halfAngle = angle * 0.5;
    const s = Math.sin(halfAngle);
    const c = Math.cos(halfAngle);
    const a = axis.normalize();
    return new Quat(a.x * s, a.y * s, a.z * s, c);
  }

  static fromEulerYXZ(yaw: number, pitch: number, roll: number): Quat {
    const qy = Quat.fromAxisAngle(Vec3.UP, yaw);
    const qx = Quat.fromAxisAngle(new Vec3(1, 0, 0), pitch);
    const qz = Quat.fromAxisAngle(new Vec3(0, 0, 1), roll);
    return qz.multiply(qx).multiply(qy);
  }

  rotateVector(v: Vec3): Vec3 {
    const qv = new Quat(v.x, v.y, v.z, 0);
    const conjugate = new Quat(-this.x, -this.y, -this.z, this.w);
    const result = this.multiply(qv).multiply(conjugate);
    return new Vec3(result.x, result.y, result.z);
  }

  slerp(other: Quat, t: number): Quat {
    let dot = this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    let qx = other.x, qy = other.y, qz = other.z, qw = other.w;
    if (dot < 0) { dot = -dot; qx = -qx; qy = -qy; qz = -qz; qw = -qw; }
    if (dot > 0.9995) {
      return new Quat(
        this.x + t * (qx - this.x),
        this.y + t * (qy - this.y),
        this.z + t * (qz - this.z),
        this.w + t * (qw - this.w)
      ).normalize();
    }
    const theta = Math.acos(dot);
    const sinTheta = Math.sin(theta);
    const wa = Math.sin((1 - t) * theta) / sinTheta;
    const wb = Math.sin(t * theta) / sinTheta;
    return new Quat(
      wa * this.x + wb * qx,
      wa * this.y + wb * qy,
      wa * this.z + wb * qz,
      wa * this.w + wb * qw
    ).normalize();
  }

  normalize(): Quat {
    const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (len === 0) return new Quat(0, 0, 0, 1);
    return new Quat(this.x / len, this.y / len, this.z / len, this.w / len);
  }

  toEuler(): { yaw: number; pitch: number; roll: number } {
    const sinp = 2 * (this.w * this.y - this.z * this.x);
    let pitch: number;
    if (Math.abs(sinp) >= 1) {
      pitch = Math.sign(sinp) * Math.PI / 2;
    } else {
      pitch = Math.asin(sinp);
    }
    const yaw = Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y));
    const roll = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z));
    return { yaw, pitch, roll };
  }

  static IDENTITY = new Quat(0, 0, 0, 1);
}

/** Math helpers */
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

export function radToDeg(rad: number): number {
  return rad * 180 / Math.PI;
}