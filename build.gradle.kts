plugins {
    kotlin("jvm") version "2.1.10"
    java
    application
    `java-library`
    `maven-publish`
}

//group = 'org.example'
version = "7.5-SNAPSHOT"

// build.gradle.kts
sourceSets {
    main {
        java.srcDirs("src/main/kotlin") // Common folder for Java sources
        kotlin.srcDirs("src/main/kotlin") // Common folder for Kotlin sources
    }
    test {
        java.srcDirs("src/test/kotlin") // Common folder for Java test sources
        kotlin.srcDirs("src/test/kotlin") // Common folder for Kotlin test sources
    }
}

repositories {
    mavenCentral()
    maven("%PROJECTS%")
    maven { url = uri("https://oss.sonatype.org/content/repositories/snapshots/") }
    jcenter()
}

dependencies {
    api("net.dv8tion:JDA:5.6.1")
    //implementation ("com.tfowl.ktor:ktor-jsoup:2.0.0")
    testImplementation ("org.jetbrains.kotlin:kotlin-test")

    api("com.spartanlabs:GeneralTools:1.2.0c")

    // This dependency is exported to consumers, that is to say found on their compile classpath.
    api("org.apache.commons:commons-math3:3.6.1")

    // This dependency is used internally, and not exposed to consumers on their own compile classpath.
    implementation("com.google.guava:guava:31.1-jre")

    //implementation(fileTree( "libs", include: ["*.jar"])

    //implementation 'com.github.sapher:youtubedl-java:1.1'


    // https://mvnrepository.com/artifact/org.json/json
    implementation("org.json:json:20220924")

    // https://mvnrepository.com/artifact/com.mashape.unirest/unirest-java
    implementation("com.mashape.unirest:unirest-java:1.4.9")

    implementation("com.rometools:rome:1.18.0")
    implementation("org.slf4j:slf4j-api:2.0.13") // Or the latest stable version
    implementation("ch.qos.logback:logback-classic:1.5.6") // Or the latest stable version

    implementation("org.springframework:spring-context:5.3.23")
    testImplementation("org.jetbrains.kotlin:kotlin-script-runtime:1.7.10")

    implementation("it.skrape:skrapeit:1.2.2")//1.3.0-alpha.2
    //implementation("it.skrape:skrapeit-core:+")
    //implementation("it.skrape:skrapeit-ktor:+")
    //skrapeimplementation("io.ktor:ktor-client-core:3.2.3")

    //{isChanging = true}
    //implementation "it.skrape:skrapeit:1.1.5"
    implementation("org.jsoup:jsoup:1.15.3")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.7.21")
    // https://mvnrepository.com/artifact/it.marplex.cloudflarebypass/cloudflare-bypass
    //implementation("it.marplex.cloudflarebypass:cloudflare-bypass:1.0")
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(23)
}

configurations.all {
    resolutionStrategy {
        cacheChangingModulesFor(0, "seconds")
    }
}