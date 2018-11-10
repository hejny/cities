import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
    marker: {
        position: 'absolute',
        background:
            'url(//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png) no-repeat',
        top: '50%',
        left: '50%',
        // transform: 'translate(-50%, -50%)',
        zIndex: 400,
        marginLeft: -12,
        marginTop: -41,
        width: 25,
        height: 41,
    },
});

export const MapMarker = withStyles(styles)(
    ({ classes }: WithStyles<typeof styles>) => (
        <div className={classes.marker} />
    ),
);
