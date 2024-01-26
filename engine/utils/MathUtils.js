/**
 * Calculate the magnitude of the vector
 * @param vec vector
 * @return {number} magnitude
 */
export const calcMagnitude = (vec) => {
    return Math.sqrt(vec.x ** 2 + vec.y ** 2);
}

/**
 * Calculate the dot products of the vectors
 * @param vec1 vector 1
 * @param vec2 vector 2
 * @return {number} magnitude
 */
export const dotProduct = (vec1, vec2) => {
    return vec1.x * vec2.x + vec1.y * vec2.y;
}

/**
 * calculate the angle between two vectors
 * @param vec1 vector 1
 * @param vec2 vector 2
 * @return {number} angle in radians
 */
export const angleBetween = (vec1, vec2) => {
    return Math.acos(dotProduct(vec1, vec2) / (calcMagnitude(vec1) * calcMagnitude(vec2)));
}
