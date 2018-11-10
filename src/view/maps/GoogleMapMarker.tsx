import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
    marker: {
        position: 'absolute',
        background:
            'url(http://maps.gstatic.com/mapfiles/markers2/marker.png) no-repeat',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        zIndex: 1,
        marginLeft: -10,
        marginTop: -34,
        height: 34,
        width: 20,
    },
});

export const GoogleMapMarker = withStyles(styles)(
    ({ classes }: WithStyles<typeof styles>) => (
        <div id="map-marker" className={classes.marker} />
    ),
);
