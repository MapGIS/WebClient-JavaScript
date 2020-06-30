import {
    Zondy
} from '../../common/Base';
import {Corner} from './extent/Corner';
import {Relationship} from './extent/Relationship';

/**
 * @private
 * @description Build an extent that includes all given coordinates.
 * 构建包含所有给定坐标的范围。
 * @param coordinates Coordinates.
 * @return {Extent} Bounding extent.
 */
var boundingExtent = function (coordinates) {
    const extent = createEmpty();
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}

/**
 * @private
 * @description 根据给定的值返回递增的范围
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent=} opt_extent 目标范围.
 * @private
 * @return {Extent} Extent.
 */
var _boundingExtentXYs = function (xs, ys, opt_extent) {
    const minX = Math.min.apply(null, xs);
    const minY = Math.min.apply(null, ys);
    const maxX = Math.max.apply(null, xs);
    const maxY = Math.max.apply(null, ys);
    return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}

/**
 * @private
 * @description Return extent increased by the provided value.
 * 根据给定的值返回递增的范围
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var buffer = function (extent, value, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0] - value;
        opt_extent[1] = extent[1] - value;
        opt_extent[2] = extent[2] + value;
        opt_extent[3] = extent[3] + value;
        return opt_extent;
    } else {
        return [
            extent[0] - value,
            extent[1] - value,
            extent[2] + value,
            extent[3] + value
        ];
    }
}

/**
 * @private
 * @description Creates a clone of an extent.
 * 克隆一个范围
 * @param {Extent} extent Extent to clone.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} The clone.
 */
var clone = function (extent, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0];
        opt_extent[1] = extent[1];
        opt_extent[2] = extent[2];
        opt_extent[3] = extent[3];
        return opt_extent;
    } else {
        return extent.slice();
    }
}

/**
 * @private
 * @description 最近的平方距离
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */
var closestSquaredDistanceXY = function (extent, x, y) {
    let dx,
        dy;
    if (x < extent[0]) {
        dx = extent[0] - x;
    } else if (extent[2] < x) {
        dx = x - extent[2];
    } else {
        dx = 0;
    }
    if (y < extent[1]) {
        dy = extent[1] - y;
    } else if (extent[3] < y) {
        dy = y - extent[3];
    } else {
        dy = 0;
    }
    return dx * dx + dy * dy;
}

/**
 * @private
 * @description Check if the passed coordinate is contained or on the edge of the extent.
 * 检查传递的坐标是否包含在指定范围内或者在指定范围的边缘
 * @param {Extent} extent Extent.
 * @param  coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 */
var containsCoordinate = function (extent, coordinate) {
    return containsXY(extent, coordinate[0], coordinate[1]);
}

/**
 * @private
 * @description Check if one extent contains another.
 * 检查一个范围是否包含另一个范围
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 * 如果一个范围完全被包含在另一个范围内，则视为包含范围，包括它们共享一个或者多个边
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 */
var containsExtent = function (extent1, extent2) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] &&
        extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}

/**
 * @private
 * @description Check if the passed coordinate is contained or on the edge of the extent.
 * 检查传递的坐标是否包含在指定范围内或者在指定范围的边缘
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 */
var containsXY = function (extent, x, y) {
    return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}

/**
 * @private
 * @description Get the relationship between a coordinate and extent.
 * 获取坐标与范围之间的关系
 * @param {Extent} extent The extent.
 * @param  coordinate The coordinate.
 * @return {Relationship} The relationship (bitwise compare with
 *     Relationship).
 */
var coordinateRelationship = function (extent, coordinate) {
    const minX = extent[0];
    const minY = extent[1];
    const maxX = extent[2];
    const maxY = extent[3];
    const x = coordinate[0];
    const y = coordinate[1];
    let relationship = Relationship.UNKNOWN;
    if (x < minX) {
        relationship = relationship | Relationship.LEFT;
    } else if (x > maxX) {
        relationship = relationship | Relationship.RIGHT;
    }
    if (y < minY) {
        relationship = relationship | Relationship.BELOW;
    } else if (y > maxY) {
        relationship = relationship | Relationship.ABOVE;
    }
    if (relationship === Relationship.UNKNOWN) {
        relationship = Relationship.INTERSECTING;
    }
    return relationship;
}

/**
 * @private
 * @description Create an empty extent.
 * 创建一个空范围
 * @return {Extent} Empty extent.
 */
var createEmpty = function () {
    return [Infinity, Infinity, -Infinity, -Infinity];
}

/**
 * @private
 * @description Create a new extent or update the provided extent.
 * 创建一个新范围或者更新给定的范围
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */
var createOrUpdate = function (minX, minY, maxX, maxY, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = minX;
        opt_extent[1] = minY;
        opt_extent[2] = maxX;
        opt_extent[3] = maxY;
        return opt_extent;
    } else {
        return [minX, minY, maxX, maxY];
    }
}

/**
 * @private
 * @description Create a new empty extent or make the provided one empty.
 * 创建一个新的空的范围或者将给定的范围重置为空
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var createOrUpdateEmpty = function (opt_extent) {
    return createOrUpdate(
        Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}

/**
 * @private
 * @description 根据给定的坐标创建一个范围或者更新给定的范围
 * @param  coordinate Coordinate.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var createOrUpdateFromCoordinate = function (coordinate, opt_extent) {
    const x = coordinate[0];
    const y = coordinate[1];
    return createOrUpdate(x, y, x, y, opt_extent);
}

/**
 * @private
 * @description 根据给定的坐标集创建一个范围或者更新给定的范围
 * @param coordinates Coordinates.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var createOrUpdateFromCoordinates = function (coordinates, opt_extent) {
    const extent = createOrUpdateEmpty(opt_extent);
    return extendCoordinates(extent, coordinates);
}

/**
 * @private
 * @description 根据给定的平面坐标集创建一个范围或者更新给定的范围
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var createOrUpdateFromFlatCoordinates = function (flatCoordinates, offset, end, stride, opt_extent) {
    const extent = createOrUpdateEmpty(opt_extent);
    return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}

/**
 * @private
 * @description 根据给定的圆环创建一个范围或者更新给定的范围
 * @param rings Rings.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var createOrUpdateFromRings = function (rings, opt_extent) {
    const extent = createOrUpdateEmpty(opt_extent);
    return extendRings(extent, rings);
}

/**
 * @private
 * @description Determine if two extents are equivalent.
 * 确定两个范围是否相等
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */
var equals = function (extent1, extent2) {
    return extent1[0] == extent2[0] && extent1[2] == extent2[2] &&
        extent1[1] == extent2[1] && extent1[3] == extent2[3];
}

/**
 * @private
 * @description Modify an extent to include another extent.
 * 修改一个范围使其包含另一个范围。
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */
var extend = function (extent1, extent2) {
    if (extent2[0] < extent1[0]) {
        extent1[0] = extent2[0];
    }
    if (extent2[2] > extent1[2]) {
        extent1[2] = extent2[2];
    }
    if (extent2[1] < extent1[1]) {
        extent1[1] = extent2[1];
    }
    if (extent2[3] > extent1[3]) {
        extent1[3] = extent2[3];
    }
    return extent1;
}

/**
 * @private
 * @description 扩展坐标
 * @param {Extent} extent Extent.
 * @param  coordinate Coordinate.
 */
var extendCoordinate = function (extent, coordinate) {
    if (coordinate[0] < extent[0]) {
        extent[0] = coordinate[0];
    }
    if (coordinate[0] > extent[2]) {
        extent[2] = coordinate[0];
    }
    if (coordinate[1] < extent[1]) {
        extent[1] = coordinate[1];
    }
    if (coordinate[1] > extent[3]) {
        extent[3] = coordinate[1];
    }
}

/**
 * @private
 * @description 扩展坐标集
 * @param {Extent} extent Extent.
 * @param coordinates Coordinates.
 * @return {Extent} Extent.
 */
var extendCoordinates = function (extent, coordinates) {
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}

/**
 * @private
 * @description 扩展平面坐标集
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */
var extendFlatCoordinates = function (extent, flatCoordinates, offset, end, stride) {
    for (; offset < end; offset += stride) {
        extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
    }
    return extent;
}

/**
 * @private
 * @description 扩展圆环
 * @param {Extent} extent Extent.
 * @param rings Rings.
 * @return {Extent} Extent.
 */
var extendRings = function (extent, rings) {
    for (let i = 0, ii = rings.length; i < ii; ++i) {
        extendCoordinates(extent, rings[i]);
    }
    return extent;
}

/**
 * @private
 * @description 扩展XY坐标
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */
var extendXY = function (extent, x, y) {
    extent[0] = Math.min(extent[0], x);
    extent[1] = Math.min(extent[1], y);
    extent[2] = Math.max(extent[2], x);
    extent[3] = Math.max(extent[3], y);
}

/**
 * @private
 * @description This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * 这是一个用于范围的每个角的回调函数。如果回调返回true，函数立即返回该值，否则返回false
 * @param {Extent} extent Extent.
 * @param  callback Callback.
 * @param {T=} opt_this Value to use as `this` when executing `callback`.
 * @return {S|boolean} Value.
 * @template S, T
 */
var forEachCorner = function (extent, callback, opt_this) {
    let val;
    val = callback.call(opt_this, getBottomLeft(extent));
    if (val) {
        return val;
    }
    val = callback.call(opt_this, getBottomRight(extent));
    if (val) {
        return val;
    }
    val = callback.call(opt_this, getTopRight(extent));
    if (val) {
        return val;
    }
    val = callback.call(opt_this, getTopLeft(extent));
    if (val) {
        return val;
    }
    return false;
}

/**
 * @private
 * @description Get the size of an extent.
 * 获取范围的大小
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */
var getArea = function (extent) {
    let area = 0;
    if (!isEmpty(extent)) {
        area = getWidth(extent) * getHeight(extent);
    }
    return area;
}

/**
 * @private
 * @description Get the bottom left coordinate of an extent.
 * 获取范围左下方坐标
 * @param {Extent} extent Extent.
 * @return  Bottom left coordinate.
 * @api
 */
var getBottomLeft = function (extent) {
    return [extent[0], extent[1]];
}

/**
 * @private
 * @description Get the bottom right coordinate of an extent.
 * 获取范围右下方坐标
 * @param {Extent} extent Extent.
 * @return  Bottom right coordinate.
 * @api
 */
var getBottomRight = function (extent) {
    return [extent[2], extent[1]];
}

/**
 * @private
 * @description Get the center coordinate of an extent.
 * 获取范围的中间坐标
 * @param {Extent} extent Extent.
 * @return  Center.
 * @api
 */
var getCenter = function (extent) {
    return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}

/**
 * @private
 * @description Get a corner coordinate of an extent.
 * 获取范围的角坐标
 * @param {Extent} extent Extent.
 * @param {Corner} corner Corner.
 * @return  Corner coordinate.
 */
var getCorner = function (extent, corner) {
    let coordinate;
    if (corner === Corner.BOTTOM_LEFT) {
        coordinate = getBottomLeft(extent);
    } else if (corner === Corner.BOTTOM_RIGHT) {
        coordinate = getBottomRight(extent);
    } else if (corner === Corner.TOP_LEFT) {
        coordinate = getTopLeft(extent);
    } else if (corner === Corner.TOP_RIGHT) {
        coordinate = getTopRight(extent);
    } else {
        //assert(false, 13); // Invalid corner
    }
    return (
        (coordinate)
    );
}

/**
 * @private
 * @description 获取扩展区域
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */
var getEnlargedArea = function (extent1, extent2) {
    const minX = Math.min(extent1[0], extent2[0]);
    const minY = Math.min(extent1[1], extent2[1]);
    const maxX = Math.max(extent1[2], extent2[2]);
    const maxY = Math.max(extent1[3], extent2[3]);
    return (maxX - minX) * (maxY - minY);
}

/**
 * @private
 * @description 获取视图和大小
 * @param  center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param size Size.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */
var getForViewAndSize = function (center, resolution, rotation, size, opt_extent) {
    const dx = resolution * size[0] / 2;
    const dy = resolution * size[1] / 2;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    const xCos = dx * cosRotation;
    const xSin = dx * sinRotation;
    const yCos = dy * cosRotation;
    const ySin = dy * sinRotation;
    const x = center[0];
    const y = center[1];
    const x0 = x - xCos + ySin;
    const x1 = x - xCos - ySin;
    const x2 = x + xCos - ySin;
    const x3 = x + xCos + ySin;
    const y0 = y - xSin - yCos;
    const y1 = y - xSin + yCos;
    const y2 = y + xSin + yCos;
    const y3 = y + xSin - yCos;
    return createOrUpdate(
        Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3),
        Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3),
        opt_extent);
}

/**
 * @private
 * @description Get the height of an extent.
 * 获取范围的高
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */
var getHeight = function (extent) {
    return extent[3] - extent[1];
}

/**
 * @private
 * @description 获取范围间重叠面积
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */
var getIntersectionArea = function (extent1, extent2) {
    const intersection = getIntersection(extent1, extent2);
    return getArea(intersection);
}

/**
 * @private
 * @description Get the intersection of two extents.
 * 获取两个范围的交叉区
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent=} opt_extent Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */
var getIntersection = function (extent1, extent2, opt_extent) {
    const intersection = opt_extent ? opt_extent : createEmpty();
    if (intersects(extent1, extent2)) {
        if (extent1[0] > extent2[0]) {
            intersection[0] = extent1[0];
        } else {
            intersection[0] = extent2[0];
        }
        if (extent1[1] > extent2[1]) {
            intersection[1] = extent1[1];
        } else {
            intersection[1] = extent2[1];
        }
        if (extent1[2] < extent2[2]) {
            intersection[2] = extent1[2];
        } else {
            intersection[2] = extent2[2];
        }
        if (extent1[3] < extent2[3]) {
            intersection[3] = extent1[3];
        } else {
            intersection[3] = extent2[3];
        }
    } else {
        createOrUpdateEmpty(intersection);
    }
    return intersection;
}

/**
 * @private
 * @description 获取范围的余量(边)
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */
var getMargin = function (extent) {
    return getWidth(extent) + getHeight(extent);
}

/**
 * @private
 * @description Get the size (width, height) of an extent.
 * 获取范围的大小（宽，高）
 * @param {Extent} extent The extent.
 * @return The extent size.
 * @api
 */
var getSize = function (extent) {
    return [extent[2] - extent[0], extent[3] - extent[1]];
}

/**
 * @private
 * @description Get the top left coordinate of an extent.
 * 获取范围左上方坐标
 * @param {Extent} extent Extent.
 * @return  Top left coordinate.
 * @api
 */
var getTopLeft = function (extent) {
    return [extent[0], extent[3]];
}

/**
 * @private
 * @description Get the top right coordinate of an extent.
 * 获取范围右上方坐标
 * @param {Extent} extent Extent.
 * @return  Top right coordinate.
 * @api
 */
var getTopRight = function (extent) {
    return [extent[2], extent[3]];
}

/**
 * @private
 * @description Get the width of an extent.
 * 获取范围的宽
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */
var getWidth = function (extent) {
    return extent[2] - extent[0];
}

/**
 * @private
 * @description Determine if one extent intersects another.
 * 确定一个范围是否与另一个范围相交
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */
var intersects = function (extent1, extent2) {
    return extent1[0] <= extent2[2] &&
        extent1[2] >= extent2[0] &&
        extent1[1] <= extent2[3] &&
        extent1[3] >= extent2[1];
}

/**
 * @private
 * @description Determine if an extent is empty.
 * 确定一个范围是否为空
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */
var isEmpty = function (extent) {
    return extent[2] < extent[0] || extent[3] < extent[1];
}

/**
 * @private
 * @description 返回或者更新一个范围
 * @param {Extent} extent Extent.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */
var returnOrUpdate = function (extent, opt_extent) {
    if (opt_extent) {
        opt_extent[0] = extent[0];
        opt_extent[1] = extent[1];
        opt_extent[2] = extent[2];
        opt_extent[3] = extent[3];
        return opt_extent;
    } else {
        return extent;
    }
}

/**
 * @private
 * @description 从中心扩展
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */
var scaleFromCenter = function (extent, value) {
    const deltaX = ((extent[2] - extent[0]) / 2) * (value - 1);
    const deltaY = ((extent[3] - extent[1]) / 2) * (value - 1);
    extent[0] -= deltaX;
    extent[2] += deltaX;
    extent[1] -= deltaY;
    extent[3] += deltaY;
}

/**
 * @private
 * @description Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * 确定两个坐标之间的线段是否与提供的范围相交（交叉，触摸或包含）。
 * @param {Extent} extent The extent.
 * @param  start Segment start coordinate.
 * @param  end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */
var intersectsSegment = function (extent, start, end) {
    let intersects = false;
    const startRel = coordinateRelationship(extent, start);
    const endRel = coordinateRelationship(extent, end);
    if (startRel === Relationship.INTERSECTING ||
        endRel === Relationship.INTERSECTING) {
        intersects = true;
    } else {
        const minX = extent[0];
        const minY = extent[1];
        const maxX = extent[2];
        const maxY = extent[3];
        const startX = start[0];
        const startY = start[1];
        const endX = end[0];
        const endY = end[1];
        const slope = (endY - startY) / (endX - startX);
        let x,
            y;
        if (!!(endRel & Relationship.ABOVE) &&
            !(startRel & Relationship.ABOVE)) {
            // potentially intersects top
            x = endX - ((endY - maxY) / slope);
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects && !!(endRel & Relationship.RIGHT) &&
            !(startRel & Relationship.RIGHT)) {
            // potentially intersects right
            y = endY - ((endX - maxX) * slope);
            intersects = y >= minY && y <= maxY;
        }
        if (!intersects && !!(endRel & Relationship.BELOW) &&
            !(startRel & Relationship.BELOW)) {
            // potentially intersects bottom
            x = endX - ((endY - minY) / slope);
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects && !!(endRel & Relationship.LEFT) &&
            !(startRel & Relationship.LEFT)) {
            // potentially intersects left
            y = endY - ((endX - minX) * slope);
            intersects = y >= minY && y <= maxY;
        }

    }
    return intersects;
}

/**
 * @private
 * @description Apply a transform function to the extent.
 * 在范围内应用变换函数
 * @param {Extent} extent Extent.
 * @param transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 * @api
 */
var applyTransform = function (extent, transformFn, opt_extent) {
    const coordinates = [
        extent[0], extent[1],
        extent[0], extent[3],
        extent[2], extent[1],
        extent[2], extent[3]
    ];
    transformFn(coordinates, coordinates, 2);
    const xs = [coordinates[0], coordinates[2], coordinates[4], coordinates[6]];
    const ys = [coordinates[1], coordinates[3], coordinates[5], coordinates[7]];
    return _boundingExtentXYs(xs, ys, opt_extent);
}

export {
    boundingExtent,
    buffer,
    clone,
    closestSquaredDistanceXY,
    containsCoordinate,
    containsExtent,
    containsXY,
    coordinateRelationship,
    createEmpty,
    createOrUpdate,
    createOrUpdateEmpty,
    createOrUpdateFromCoordinate,
    createOrUpdateFromCoordinates,
    createOrUpdateFromFlatCoordinates,
    createOrUpdateFromRings,
    equals,
    extend,
    extendCoordinate,
    extendCoordinates,
    extendFlatCoordinates,
    extendRings,
    extendXY,
    forEachCorner,
    getArea,
    getBottomLeft,
    getBottomRight,
    getCenter,
    getCorner,
    getEnlargedArea,
    getForViewAndSize,
    getHeight,
    getIntersectionArea,
    getIntersection,
    getMargin,
    getSize,
    getTopLeft,
    getTopRight,
    getWidth,
    intersects,
    isEmpty,
    returnOrUpdate,
    scaleFromCenter,
    intersectsSegment,
    applyTransform
};

Zondy.extent.boundingExtent = boundingExtent;
Zondy.extent.buffer = buffer;
Zondy.extent.clone = clone;
Zondy.extent.closestSquaredDistanceXY = closestSquaredDistanceXY;
Zondy.extent.containsCoordinate = containsCoordinate;
Zondy.extent.containsExtent = containsExtent;
Zondy.extent.containsXY = containsXY;
Zondy.extent.coordinateRelationship = coordinateRelationship;
Zondy.extent.createEmpty = createEmpty;
Zondy.extent.createOrUpdate = createOrUpdate;
Zondy.extent.createOrUpdateEmpty = createOrUpdateEmpty;
Zondy.extent.createOrUpdateFromCoordinate = createOrUpdateFromCoordinate;
Zondy.extent.createOrUpdateFromCoordinates = createOrUpdateFromCoordinates;
Zondy.extent.createOrUpdateFromFlatCoordinates = createOrUpdateFromFlatCoordinates;
Zondy.extent.createOrUpdateFromRings = createOrUpdateFromRings;
Zondy.extent.equals = equals;
Zondy.extent.extend = extend;
Zondy.extent.extendCoordinate = extendCoordinate;
Zondy.extent.extendCoordinates = extendCoordinates;
Zondy.extent.extendFlatCoordinates = extendFlatCoordinates;
Zondy.extent.extendRings = extendRings;
Zondy.extent.extendXY = extendXY;
Zondy.extent.forEachCorner = forEachCorner;
Zondy.extent.getArea = getArea;
Zondy.extent.getBottomLeft = getBottomLeft;
Zondy.extent.getBottomRight = getBottomRight;
Zondy.extent.getCenter = getCenter;
Zondy.extent.getCorner = getCorner;
Zondy.extent.getEnlargedArea = getEnlargedArea;
Zondy.extent.getForViewAndSize = getForViewAndSize;
Zondy.extent.getHeight = getHeight;
Zondy.extent.getIntersectionArea = getIntersectionArea;
Zondy.extent.getIntersection = getIntersection;
Zondy.extent.getMargin = getMargin;
Zondy.extent.getSize = getSize;
Zondy.extent.getTopLeft = getTopLeft;
Zondy.extent.getTopRight = getTopRight;
Zondy.extent.getWidth = getWidth;
Zondy.extent.intersects = intersects;
Zondy.extent.isEmpty = isEmpty;
Zondy.extent.returnOrUpdate = returnOrUpdate;
Zondy.extent.scaleFromCenter = scaleFromCenter;
Zondy.extent.intersectsSegment = intersectsSegment;
Zondy.extent.applyTransform = applyTransform;