(function() {
  'use strict';

  angular
    .module('vigilantOcto')
    .directive('vigilantNavbar', vigilantNavbar);

  /** @ngInject */
  function vigilantNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {},
      controller: VigilantNavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function VigilantNavbarController() {}
  }

})();
