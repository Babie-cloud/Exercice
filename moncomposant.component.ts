import { Component, OnInit } from '@angular/core';
// ... autres imports

@Component({
  selector: 'app-features',
  standalone: true, // Déclarer FeaturesComponent comme standalone
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.ts'],
  imports: [CommonModule, HttpClientModule] // Importer les dépendances nécessaires
})
export class MonComposantComponent { }