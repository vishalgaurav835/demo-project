// *** APIS Success and Fail Messages

const response = {
    todo : {
        createSuccess: 'Todo created successfully!',
        deleteSuccess : 'Deleted todo successfully!',
        completeSuccess : 'Complete todo successfully!',
        deleteFail : 'Deleting todo failed!',
        completeFail : 'complete todo failed!',
        fetchList : 'Fetched todo list successfully!', 
    }
}

const log = {
    todo : {
        info: {
            create: 'Received payload to create todo',
            update: 'Received payload to update todo',
            fetch: 'Received payload to fetch todo',
            delete :  'Received payload to delete todo',
            complete :  'Received payload of complete todo',
        }, 
        error: {
            create:  'Error occured while creating todo',
            fetch: 'Error occured while fetching todo',
            delete :  'Error occured while deleting todo',
            complete :  'Error occured while completing todo',
            dbConnectionFail: 'Error while connecting DB',
        }
    }
}

module.exports = {
    response, log
}
