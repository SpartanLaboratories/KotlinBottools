package bottools.services

import bottools.dataprocessing.D
import bottools.dataprocessing.KotGDP
import bottools.dataprocessing.minus
import net.dv8tion.jda.api.OnlineStatus
import net.dv8tion.jda.api.entities.Guild
import net.dv8tion.jda.api.entities.Member
import org.apache.commons.lang3.tuple.ImmutablePair
import org.slf4j.LoggerFactory
import java.util.function.Consumer

open class UserBasedService internal constructor(serviceName: String) : CheckValueService(serviceName) {
    open var oldValue:String
        get() = finalAccessPoint()!!.left-finalAccessPoint()!!.right
        set(value) = finalAccessPoint()!!.left/finalAccessPoint()!!.right + value
    private fun finalAccessPoint():ImmutablePair<KotGDP.DataAccessPoint, String>?{
        var accessPoint = D/guild/member
        packet.oldValue.split("/").let{
            it.forEachIndexed{index, name ->
                if(index < it.size - 1)
                    accessPoint = accessPoint/name
                else return ImmutablePair.of(accessPoint, name)
            }
        }
        return null
    }
    override operator fun invoke() = jda!!.guilds.forEach(::checkGuild)

    protected open fun checkGuild(guild: Guild) {
        this.guild = guild
        log.debug("Checking guild: {}", guild.name)
        guild.members.forEach{
            if (it.onlineStatus == OnlineStatus.ONLINE)
                checkMember(it)
        }
    }

    protected fun checkMember(member: Member) {
        this.member = member // Later functions will use the property
        log.debug("Checking member: {}", member.user.name)
        val memberUrl = substituteUrl() ?: return
        connect(memberUrl)
        navigate()
        checkValues(oldValue)
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
        fun createService(serviceName: String, onChange: Consumer<Array<String>>, interval: Int) =
            createService(UserBasedService(serviceName), onChange, interval)
    }
}