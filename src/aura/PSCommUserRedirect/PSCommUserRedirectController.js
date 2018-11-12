({
   redirect: function(component, event, helper) {
        var userDetails;
        var state;
        var navEvt;

        console.log('href=' + location.href);
        
        var action = component.get("c.getLoggedInUser");
        action.setCallback(this, function(response) {
            state = response.getState();
            if (state === "SUCCESS") {
                console.log('response=' + response.getReturnValue());

                userDetails = response.getReturnValue();

                var dest = component.get('v.destination');
                var loc = location.href;

                if (!loc.includes('livepreview'))
                {
                  var recId = null;

                  if (dest == 'Contact')
                  {
                    recId = userDetails.contactId;
                    console.log('destination is Contact [' + recId + ']');
                  }  
                  else if (dest == 'User')
                  {
                    recId = userDetails.userId;
                    console.log('destination is User [' + recId + ']');
                  }
                  else if (dest == 'Account')
                  {
                    recId = userDetails.accountId;
                    console.log('destination is Account [' + recId + ']');
                  }

                  navEvt = $A.get("e.force:navigateToSObject");
                  navEvt.setParams({
                      "recordId": recId,
                      "slideDevName": "detail"
                  });
                  navEvt.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})