export class PageResources {

    // GENERIC resources
    public static readonly CrudActions = {
        Add: 'A',
        Update: 'U',
        Delete: 'D'
    };
    
    public static readonly DeleteConfirmationData = {
        message: 'Are you sure want to delete?',
        buttonText: {
            ok: 'Delete',
            cancel: 'Cancel'
        }
    };


    // PAGE DESIGNER resources
    public static readonly PageControlApiUrl = {
        getAllMenuPageControls: '/menu',
        addMenuPageControls: '/controls',
        updateMenuPageControls: '/controls',
        deleteMenuPageControls: '/controls'
    };

    public static readonly Controls = {
        container: 'container',
        textbox: 'textbox',
        button: 'button'
    };

    public static readonly DeleteControlNotFound = 'Control not found';
    public static readonly DeleteControlSuccessfully = 'Control deleted successfully';



    // IO Resources
    public static readonly PageIOApiUrl = {
        getAllEvents: '/events',
        addEvent: '/events',
        updateEvent: '/events',
        deleteEvent: '/events'
    };
    public static readonly ResetEventError = 'Event cannot be reoved as it being used. Please check input output page for selected control event';
    public static readonly DeleteInputError = 'Input is being used in control [[control_name]]. Reset Control property to delete this.';
}