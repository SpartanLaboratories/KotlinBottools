package bottools.services

import bottools.dataprocessing.D
import bottools.dataprocessing.minus
import net.dv8tion.jda.api.OnlineStatus
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Member
import org.slf4j.LoggerFactory
import java.util.function.Consumer

open class UserBasedService internal constructor(var serviceName: String) : CheckValueService(serviceName) {
    override fun loop() {
        jda!!.guilds.forEach(Consumer { guild: Guild -> checkGuild(guild) })
    }

    protected open fun checkGuild(guild: Guild) {
        this.guild = guild
        log.debug("Checking guild: {}", guild.name)
        guild.members.forEach(Consumer { member: Member ->
            if (member.onlineStatus == OnlineStatus.ONLINE)
                checkMember(member)
        })
    }

    protected fun checkMember(member: Member) {
        this.member = member // Later functions will use the property
        log.debug("Checking member: {}", member.user.name)
        val memberUrl = substituteUrl() ?: return
        connect(memberUrl)
        navigate()
        checkValues()
    }

    private fun substituteUrl(): String? {
        val userId = userId
        if (userId == null || userId == "" || userId == "none") return null
        log.debug("Found id: {}, for user: {}", userId, member.user.name)
        return packet.uRL.replace("userid", userId)
    }

    protected open val userId: String?
        protected get() = D/guild/member - "keyid"

    companion object {
        private val log = LoggerFactory.getLogger(UserBasedService::class.java)
        fun createService(serviceName: String, onChange: Consumer<String>, interval: Int) =
            createService(UserBasedService(serviceName), onChange, interval)
    }
}