import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    buttonAdd: {
        marginBottom: '10px',
    },
    itemName: {
        marginTop: '30px'
    },
    viewButton: {
        border: '1px #00DD00 solid',
        color: '#00DD00',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
    editButton: {
        border: '1px blue solid',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    }, 
    deleteButton: {
        border: '1px red solid',
        color: 'red',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
    inputSymbol: {
        display: 'flex',
    },
    symbol: {
        marginTop: '10px',
        marginRight: '10px',
        color: 'blue',
    },
    info: {
        paddingTop: '7px',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    nameItem: {
        marginTop: '20px'
    },
    symbolBreadcrumb: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    link: {
        display: 'flex',
    },  

}));