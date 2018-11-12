public class PSCommUserRedirectController {
    @AuraEnabled
    public static Map<String,String> getLoggedInUser(){
        User u = [SELECT Id, ContactId, Contact.AccountId FROM User WHERE Id =: UserInfo.getUserId() LIMIT 1];

        Map<String, String> contextMap = new Map<String, String>();
        
        contextMap.put('userId', u.Id);
        contextMap.put('contactId', u.ContactId);
        contextMap.put('accountId', u.Contact.AccountId);

        return contextMap;

    }
}