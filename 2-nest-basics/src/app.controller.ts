import { Controller, Get } from '@nestjs/common';

@Controller('/api')
class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'hi there!';
  }

  @Get('/bye')
  getByThere() {
    return 'bye there!';
  }
}

export default AppController;
