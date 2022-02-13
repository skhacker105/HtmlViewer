export class HeaderResources {

    // MENU resources
    public static readonly MenuAdded = "Menu added successfully";
    public static readonly MenuAlreadyExists = "Menu already exists in list";
    public static readonly ParentNodeNotFound = "Parent menu not found in list";
    public static readonly NodeUpdateSuccess = "Menu updated successfully";
    public static readonly MenuUpdateFail_AlreadyExists = "Menu update failed. New name already exists";
    public static readonly MenuNotFound = "Menu not foud in list";
    public static readonly MenuDeleteSuccess = "Menu deleted successfully";
    public static readonly MenuChangeSaveError = 'Save changes before selecting different Menu';
    public static readonly MenuChangesSaveSuccess = 'Menu changes saved successfully'
    public static readonly ControlsChangesSaveSuccess = 'Controls changes saved successfully'

    public static readonly MenuApiUrl = {
        getAllMenu: '/menu',
        addMenu: '/menu',
        updateMenu: '/menu/',
        deleteMenu: '/menu/'
    };

    // SNACK BAR resources
    public static readonly SnackBarErrorClass = "snack-bar-error";
    public static readonly SnackBarSuccessClass = "snack-bar-success";

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
}