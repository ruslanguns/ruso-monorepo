import { Camelify } from './camelify.pipe';

describe('Camelify', () => {
  let pipe: Camelify;

  beforeEach(() => {
    pipe = new Camelify();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should camelify return null', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('Should camelify text', () => {
    expect(
      pipe.transform('Configurar YARN en tus proyectos de ANGULAR'),
    ).toEqual('configurarYarnEnTusProyectosDeAngular');
  });

  it('Should camelify special strings', () => {
    expect(pipe.transform('http://example.com/foo')).toEqual(
      'httpExampleComFoo',
    );
    expect(pipe.transform(' http://example.com/foo ')).toEqual(
      'httpExampleComFoo',
    );
  });

  it('Should camelify latin strings', () => {
    expect(
      pipe.transform('El éxito se mide por tus hechos y no por tus palabras'),
    ).toEqual('elExitoSeMidePorTusHechosYNoPorTusPalabras');
  });
});
