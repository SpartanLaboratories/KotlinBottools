=== YOUR QUESTION (Question 10 of the research plan) ===

How should MagicBot, a separate repository, consume builds of the bottools library that are not yet released?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/unreleased-build-consumption.md

What your answer informs (use it to aim; keep it out of the file):
- how MagicBot's settings.gradle.kts and CI resolve the library;
- whether and how this repository publishes -SNAPSHOT builds from main;
- the conventions the build-logic plugins need for both.

Options to compare:
1. Composite build:
   - includeBuild("../KotlinBottools"), applied only when the sibling checkout exists;
   - dependency substitution by group:artifact coordinates (automatic or declared);
   - what happens when the sibling's build-logic or plugin versions differ from MagicBot's;
   - IDE behaviour.
2. -SNAPSHOT publishing from main to the Central Portal's snapshot repository, with com.vanniktech.maven.publish:
   - the snapshot repository URL;
   - enabling snapshots for the io.github.spartanlaboratories namespace;
   - retention;
   - whether snapshots must be signed;
   - whether Central Portal user tokens can be scoped to snapshots only;
   - how a consumer declares the snapshot repository.
3. The organisation's working agreement says registry publishing is a deliberate manual act and that no registry credentials live in CI. It also says a -SNAPSHOT published from the default branch is the staging analogue for downstream projects. Lay out the options that honour both:
   - manual snapshot publishing by the maintainer;
   - CI with a credential (which conflicts with the agreement);
   - GitHub Packages: anonymous read for Maven? It needs a token;
   - JitPack: builds from a public git repository with no credentials. KotlinBottools becomes public early in the work. Cover JitPack's support for multi-module Gradle builds and for JDK 21;
   - Gradle source dependencies (sourceControl { gitRepository(...) }): their status and limits;
   - MagicBot's CI checking out this repository beside its own checkout, so the composite build applies there too and no snapshot is needed in CI.
4. How each option behaves when the library's main moves faster than MagicBot: pinning versus floating, and reproducibility.

Requirements specific to your question:
- MagicBot builds through the composite build when the two checkouts sit side by side, and against -SNAPSHOT builds from main otherwise.
- Publishing uses com.vanniktech.maven.publish under io.github.spartanlaboratories. Nothing is released before 1.0.0, and every pre-1.0.0 build is 1.0.0-SNAPSHOT.
- The organisation's working agreement is at /home/user/spartanlaboratories/.github/CONTRIBUTING.md (sections "Releasing" and "Deployment environments").
- Reuse /home/user/spartanlaboratories/generaltools/docs/plans/7-kotlin-multiplatform/research/kmp-maven-central-publishing.md for how the plugin talks to the Central Portal. Do not re-research it; extend it to snapshots.
- MagicBot's CI builds on GitHub Actions.

Sources:
- Gradle documentation: composite builds, dependency substitution, source dependencies.
- The vanniktech gradle-maven-publish-plugin documentation and source at its current release (0.37.0 or newer, if any), for snapshot handling.
- Sonatype Central Portal documentation on publishing and consuming snapshots.
- GitHub Packages documentation for the Maven registry.
- JitPack documentation.
- MyGameTools' build-logic (/home/user/spartanlabsgaming/mygametools/build-logic) and settings, for the conventions in use.

Lenses:
- Best systems: how multi-repo Kotlin projects develop a library and its consumer side by side.
- Conventions: Gradle's recommended patterns.
- Idiomatic Kotlin: the Gradle Kotlin DSL in settings.gradle.kts and convention plugins.
