import { SlugifyPipe } from './slugify.pipe';

describe('SlugifyPipe', () => {
  let pipe: SlugifyPipe;

  beforeEach(() => {
    pipe = new SlugifyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should slugify return null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('Should slugify text', () => {
    expect(
      pipe.transform('Configurar YARN en tus proyectos de ANGULAR'),
    ).toEqual('configurar-yarn-en-tus-proyectos-de-angular');
  });

  it('Should slugify special strings', () => {
    expect(pipe.transform('http://example.com/foo')).toEqual(
      'http-example-com-foo',
    );
    expect(pipe.transform(' http://example.com/foo ')).toEqual(
      'http-example-com-foo',
    );
  });

  it('Should slugify spanish strings', () => {
    expect(
      pipe.transform('¿cómo configurar el proyecto de @ruso/angular?'),
    ).toEqual('como-configurar-el-proyecto-de-ruso-angular');
  });
});
