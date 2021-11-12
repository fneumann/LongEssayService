# Writer

Public API of the service to use the Long Essay Writer SPA.

## Usage

The application must provide a context object that implements the functions required by the Context interface:

````
use Edutiek\LongEssayService\Writer\Context;
use Edutiek\LongEssayService\Writer\Service;

class MyContext implements Context
{
    // implement the context functions
}
````

### Start the Writer Frontend
Inject the keys of the current user and task to the context before

````
 $context = new MyContext();
 $service = new Service($context->init($user_key, $task_key));
 $service->openFrontend();
````

### Hand over REST calls from the Writer Frontend
The keys of the current user and task will be injected by the service (taken from the request)
````
 $context = new MyContext();
 $service = new Service($context);
 $service->handleRequest();
````

The Writer Service will call function of the context object: 

* to get the REST and return urls
* to set and get access tokens
* to get the settings and instructions of the writing task
* to load already witten texts
* to save written texts
