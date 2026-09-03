# KotlinBotTools 🤖

A sophisticated **Kotlin-based Discord bot framework** providing an elegant, type-safe command system with filesystem-like data access patterns.

**Version:** 7.5-SNAPSHOT | **Language:** Kotlin 2.1.10 | **JVM:** Java 23

---

## ✨ Key Features

### **1. Hierarchical Command Framework**
- Multi-level sub-commands (up to 3 levels deep)
- Automatic help message generation
- Operator overloading for elegant command definition
- Support for both text and slash commands

### **2. Kotlin DSL for Command Definition**
```kotlin
class Dota2Command : GameStatsCommand("dota2") {
    init {
        subCommandRequired = true
        makeInteractible()
        SCSetID()
        SCGetID()
    }
}
```

### **3. Filesystem-Like Data Access with `/` Operator**
Navigate XML data hierarchies using intuitive path syntax:
```kotlin
val userId = D / guild / targetMember / "Games" / "dota2" - "id"
(D / guild / member / "Games" / "dota2" / "id") + "123456789"
```

### **4. Automatic Database Management**
- Per-guild data isolation in `/guildData/[GuildName]/`
- Automatic member entry creation
- Persistent XML storage with real-time writes

### **5. Event-Driven Architecture**
- Multi-event responder system
- Reaction roles, welcome messages, member joining
- Custom event action registration

### **6. Rich Message Support**
- Discord Embeds with auto footer/timestamp
- File uploads and image sharing
- Text-to-Speech messages

---

## 🚀 Getting Started

### **Prerequisites**
- Java 23+
- Kotlin 2.1.10
- Gradle 8.0+
- Discord bot token

### **Setup**

1. **Clone Repository**
```bash
git clone https://github.com/SpartanLaboratories/KotlinBotTools.git
cd KotlinBotTools
```

2. **Add Bot Token**
Create `key.txt` with your Discord bot token:
```
YOUR_BOT_TOKEN_HERE
```

⚠️ **Never commit `key.txt`!**

3. **Build & Run**
```bash
./gradlew build
./gradlew run
```

---

## 📡 Command System

### **Minimal Command Example**
```kotlin
class GreetCommand : Command("greet") {
    init {
        makeInteractible()
        setNoSubCommandDescription("Greets the mentioned user")
    }
    
    override fun invoke(args: Array<String>) {
        reply("Hello ${member.asMention}!")
    }
}

createCommand(GreetCommand())
```

### **With Sub-Commands**
```kotlin
class AdminCommand : Command("admin") {
    protected val kickSubcommand = MethodCommand(::handleKick, "kick", this)
    
    init {
        subCommandRequired = true
        makeInteractible()
        kickSubcommand + Option("user", "member", "Who to kick", true)
    }
    
    override fun invoke(args: Array<String>) { }
    
    private fun handleKick(args: Array<String>) {
        reply("Kicked ${targetMember!!.effectiveName}")
    }
}
```

### **Property-Based Commands**
```kotlin
class ConfigCommand : Command("config") {
    var botPrefix: String? = "/"
    
    init {
        PropertyCommand(::botPrefix, this)
    }
    
    override fun invoke(args: Array<String>) { }
}
```

---

## 💾 Data Access: Filesystem Pattern

### **The `/` Operator**
Extension functions on `Node` (defined in `XMLReader.kt`) enable filesystem-like navigation:

```kotlin
// Navigation: parent / "child" → returns child Node
operator fun Node.div(childName: String) = (this getChild childName)!!

// Read: node - "fieldname" → returns String value
operator fun Node.minus(childWithValue: String) = 
    (this getChild childWithValue)!!.getValue()
```

### **How It Works**
```kotlin
D / guild / member / "Games" / "dota2" - "id"
  ↓          ↓         ↓          ↓         ↓
  │          │         │          │         └─ Read value
  │          │         │          └─ Navigate down
  │          │         └─ Navigate down
  │          └─ Navigate down
  └─ Singleton instance (KotGDP)
```

### **XML Structure**
```xml
<!-- guildData/[GuildName]/MemberData.xml -->
<People>
    <Person>
        <tName>PlayerName</tName>
        <Games>
            <dota2>
                <id>123456789#0001</id>
            </dota2>
        </Games>
    </Person>
</People>
```

### **Reading & Writing**
```kotlin
// Read
val dota2Id = D / guild / member / "Games" / "dota2" - "id"

// Write
(D / guild / member / "Games" / "dota2" / "id") + "123456789#0"
```

### **Global Data Access**
```kotlin
val D = KotGDP()                           // Guild/Member data
val B = KotGDP().openFile("BotData.xml")   // Bot-global data
```

---

## 📖 Examples

### **Game Stats Command**
```kotlin
abstract class GameStatsCommand(
    protected var gameName: String
) : OnlineCommand(gameName) {
    
    internal var userID: String?
        get() = D / guild / targetMember / "Games" / gameName - "id"
        set(value) = (D / guild / targetMember / "Games" / gameName / "id") + value!!
    
    protected inner class SCSetID : SubCommand("setid", this@GameStatsCommand) {
        override fun invoke(args: Array<String>) {
            userID = args[0]
            reply("Set your $gameName ID to ${args[0]}")
        }
    }
}
```

### **Event Handling**
```kotlin
responder newGuildMemberJoinAction { event ->
    val guild = event.guild
    val member = event.member
    val defaultRole = D / guild - "defaultRole"
    guild.addRoleToMember(member, guild.getRoleById(defaultRole)!!).complete()
}
```

---

## 📁 Project Structure

```
KotlinBotTools/
├── README.md
├── build.gradle.kts
├── key.txt                    ← Bot token (KEEP SECRET)
├── BotData.xml
├── WebParseKeys.xml
│
├── src/main/kotlin/bottools/
│   ├── main/
│   │   ├── Bot.kt            ← Core bot class
│   │   ├── BotListener.kt
│   │   ├── Parser.kt
│   │   └── Responder.java
│   │
│   ├── commands/
│   │   ├── Command.kt
│   │   ├── SubCommand.kt
│   │   ├── Option.kt
│   │   ├── MethodCommand.kt
│   │   ├── PropertyCommand.kt
│   │   └── HelpCommand.kt
│   │
│   ├── dataprocessing/
│   │   ├── KotGDP.kt         ← Data access (D & B)
│   │   ├── BaseXMLReader.kt
│   │   └── XMLReader.kt      ← / operator defined here
│   │
│   └── services/
│       ├── ServiceCommand.kt
│       └── UserGameService.kt
│
├── guildData/
│   └── [GuildName]/
│       ├── GuildData.xml
│       ├── MemberData.xml
│       └── AutoPromotionRanks.xml
│
└── src/test/kotlin/
    └── DotaCommand.kt
```

---

## 🔧 Advanced Topics

### **Custom Event Actions**
```kotlin
responder newGuildUpdateNameAction { event ->
    File("guildData/${event.oldName}").renameTo(
        File("guildData/${event.newName}")
    )
}
```

### **Background Services**
```kotlin
protected fun createPatchNotesService() = 
    ServiceCommand.createService(
        "game services/dota2/patch notes",
        ::onPatchNotesAvailable,
        60  // Check interval in seconds
    )
```

### **Web Scraping**
```kotlin
val doc = Jsoup.connect("https://example.com").get()
val elements = doc.select("div.class")
```

---

## ⚠️ Known Limitations

1. **Web Scraping Fragility** – Breaks when websites update HTML structure
2. **Performance** – Each write triggers immediate XML flush to disk
3. **No Transactions** – Multiple writes aren't atomic
4. **Java 23** – Bleeding-edge; use Java 21 LTS for production
5. **Credentials Exposure** – `key.txt` should never be committed

---

## 🛠️ Development

```bash
# Build
./gradlew build

# Test
./gradlew test

# Debug - Enable in logback.xml
<logger name="bottools" level="DEBUG"/>
```

---

## 📝 License

No license specified. Contact [SpartanLaboratories](https://github.com/SpartanLaboratories) for usage rights.

---

## 👥 Contributors

- **Spartak** (@SpaSinghOut) – Primary author and maintainer

---

## 🎯 Quick Reference

```kotlin
// Send message
reply("Hello!")
Bot say "Message" in channel

// Send embed
eb.setTitle("Title").setDescription("Description")
sendEmbed()

// Get options
val user = getOption("person")?.asUser
val count = getOption("count")?.asInt

// Access data
val id = D / guild / member / "Games" / "dota2" - "id"
(D / guild / member / "Games" / "dota2") + "123456789"

// Register command
createCommand(MyCommand())

// Listen to events
responder newGuildMemberJoinAction { event ->
    // Handle join
}
```

---

**Happy bot building! 🚀**
