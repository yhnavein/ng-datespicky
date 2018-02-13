
export class PackageNameModule {
  static moduleName: string = "dates-picky";

  static bootstrap() {
    const app = angular.module(this.moduleName, []);

  }
}

PackageNameModule.bootstrap();