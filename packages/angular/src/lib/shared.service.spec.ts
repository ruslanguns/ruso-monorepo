import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    service = new SharedService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return beCool method', () => {
    const message = 'ruslan';
    const beCoolReturn = service.beCool(message);

    expect(beCoolReturn).toEqual(`From Library: What's up ${message}`);
  });
});
