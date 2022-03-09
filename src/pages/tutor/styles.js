import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
   inputSymbol: {
    display: 'flex',
    maxWidth: '300px',
   },
   symbol: {
    marginTop: '5px',
    marginRight: '10px',
    color: 'blue',
   },
   sexOption: {
    display:'flex',
    flexDirection: 'row',
   },
   nameItem: {
    marginTop: '30px',
   },
   info: {
    paddingTop: '3px',
    fontWeight: 'bold',
    fontSize: '20px',
    },
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
    symbolBreadcrumb: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    link: {
        display: 'flex',
    },
    inputImage: {
        marginTop: '6px',
    },
    avatar: {
        width: '80px',
        height: 'auto',
    },
    uploadDiv: {
        display: 'flex',
        height: '150px',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}));