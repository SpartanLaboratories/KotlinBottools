// KotlinBottools — C4 model as code (Structurizr DSL): the repository's systems and how they interact. Source of truth for docs/dashboards/index.html.
// As-is at KotlinBottools chore/issue-27-rewrite-bottools-and-private-repos d5192fc (2026-11-13): the Kotlin Discord bot framework at 7.5-SNAPSHOT, and the ten systems of the Phase 0 history-rewrite architecture: Repository hygiene built, the other nine planned and drawn dashed. Code is authoritative on any conflict.
workspace "KotlinBottools" "A Kotlin Discord bot framework on JDA, and the planned systems that purge the bot repositories' histories." {

    !identifiers hierarchical

    model {
        admin  = person "Organisation administrator" "Runs the phase's units from this machine; every write to GitHub or to a checkout is carried out on request and verified before the next step."
        github = softwareSystem "GitHub" "Hosts KotlinBottools, a fresh public repository holding the rewritten history, with secret scanning and push protection on, its private, archived predecessor KotlinBottools-legacy, and the five other bot repositories: GKB2 and GKB public, each holding its rewritten history, BotTools public, TrumpBot and Support private. Serves an unreferenced object by id." "External"

        kbt = softwareSystem "KotlinBottools" "A Kotlin Discord bot framework on JDA, built by one Gradle build; the phase's systems live outside the repository but for the hygiene files." {
            // ---- the Phase 0 history-rewrite systems (architecture section 6, 7, 9, 10): Repository hygiene built in the repository, the other nine planned ----
            toolchain = container "Toolchain" "Installs, verifies and pins git-filter-repo, gitleaks and the scripts; the canary and the fixture rehearsal prove each check is not blind." "planned · WS/tools" "Internal,Planned"
            backups   = container "Backups and manifests" "One untouched mirror per repository; the manifests of purged blob ids, the expectation rows and the positive-control scans." "planned · WS/backup, DATA/manifests" "Internal,Planned"
            dataCopy  = container "Legacy data copy" "BotData.xml and guildData/ copied byte-exactly from three revisions, verified, then marked COPY-VERIFIED." "planned · DATA" "Internal,Planned"
            pipeline  = container "Rewrite pipeline" "Per repository: list proof, pre-run checks, one filter-repo invocation, post-run checks, the push, per-ref verification, the exit tests." "planned · WS/mirror, WS/fresh, DATA/rewrite" "Internal,Planned"
            gate      = container "Privacy gate and id-reference check" "Three gate runs that count guild, member and id hits over what becomes public, and the check that nothing new cites a pre-rewrite id." "planned · WS/tools, DATA/run/gate" "Internal,Planned"
            residual  = container "Residual-exposure measurement" "Status-only probes of the old ids and the fresh-mirror reachability counts, reported as tallies." "planned · DATA/rewrite" "Internal,Planned"
            cleanup   = container "Cleanup" "Re-verifies the data folder, copies the tools into it, deletes the workspace and confirms the deletion." "planned · WS, DATA" "Internal,Planned"
            swap      = container "Repository swap" "The rehearsal, the fresh repository, the number walk, link reconciliation, the renames and archive, the visibility and scanning settings." "planned · GitHub, DATA/run/swap" "Internal,Planned"
            realign   = container "Clone realignment" "This working directory moved onto the rewritten history in place with its push-safety proof; the TrumpBot clone replaced at the same path." "planned · this working directory, DATA/run/realign" "Internal,Planned"
            hygiene   = container "Repository hygiene" "The root-anchored .gitignore, .gitleaks.toml with one scoped allowlist table, the scan wrapper, the allowlist controls and the Secret scan workflow." ".gitleaks.toml, .github/ · in the repository" "Internal"
        }

        // ---- every relationship below has a planned end, but for the Secret scan workflow's on GitHub ----
        admin -> kbt.toolchain "Runs the units from this machine"
        kbt.backups -> github "Mirror-clones each repository and records its refs"
        kbt.backups -> kbt.toolchain "Scans the untouched backup with the pinned gitleaks"
        kbt.dataCopy -> kbt.backups "Copies the data files from three revisions"
        kbt.pipeline -> kbt.backups "Is judged against the manifests and expectation rows"
        kbt.pipeline -> kbt.toolchain "Runs filter-repo and the scan wrapper"
        kbt.pipeline -> kbt.gate "Passes Gate 1 before KotlinBottools is pushed"
        kbt.pipeline -> github "Pushes each rewritten history on request: under a lease in place, unforced to the fresh repository"
        kbt.residual -> github "Probes the old ids, status only"
        kbt.swap -> github "Creates, walks, renames, archives and flips visibility, on request"
        kbt.swap -> kbt.gate "Passes Gate 2 before the renames, Gate 3 before the visibility change"
        kbt.realign -> kbt.pipeline "Reads commit-map and ref-map"
        kbt.realign -> github "Fetches the fresh repository, checked by id"
        kbt.hygiene -> github "Runs the Secret scan workflow on pushes and pull requests to main"
        kbt.cleanup -> kbt.dataCopy "Re-verifies the data folder before deleting the workspace"
    }

    views {
        systemContext kbt "Context" "KotlinBottools, who runs the phase and what it talks to." {
            include *
            autoLayout lr
        }
        container kbt "Containers" "The history-rewrite systems, the planned ones dashed, and how they depend on each other." {
            include *
            autoLayout lr
        }
        dynamic kbt "KotlinBottoolsSwap" "KotlinBottools from its rewrite to the fresh repository, as planned." {
            kbt.pipeline -> kbt.backups "Takes a fresh mirror, its backup, manifest and expectation row"
            kbt.pipeline -> kbt.gate "Gate 1 over the rewritten mirror"
            kbt.pipeline -> github "Mirror push to KotlinBottools-next"
            kbt.swap -> github "Number walk, links, renames, archive"
            kbt.swap -> kbt.gate "Gate 2 over the reproduced issues"
            kbt.realign -> github "Fetches the fresh repository, checked by id"
            autoLayout lr
        }
        styles {
            element "Person"          { shape person  background #08427b color #ffffff }
            element "Software System" { background #1168bd color #ffffff }
            element "External"        { background #999999 color #ffffff }
            element "Container"       { background #438dd5 color #ffffff }
            element "Component"       { background #85bbf0 color #000000 }
            element "Internal"        { background #c6dcf5 color #000000 }
            element "Standalone"      { background #eeeeee color #000000 border dotted }
            element "Planned"         { background #ffffff color #666666 border dashed opacity 60 }
        }
    }
}
