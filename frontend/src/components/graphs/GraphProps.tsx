export interface GraphProps {
    data: Array<any>,
    colors?: Array<string>,
    ymax?: any,
    ymin?: any,
    lineColors?: Array<string>,
    legend?: boolean,
    grid?: boolean,
    tooltip?: boolean,
    tootipTrigger?: string,
    lineType?: string,
    width?: number,
    height?: number,
}

export interface XYGraphProps extends GraphProps {
    ykeys: Array<string>,
    xkey: string,
}

export interface PieGraphProps extends GraphProps {
    nameKey: string,
    dataKey: string,
    outerRadius?: number
}