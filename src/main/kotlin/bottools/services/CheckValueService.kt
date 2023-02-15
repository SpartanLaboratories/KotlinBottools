package bottools.services

import bottools.commands.OnlineCommand
import org.slf4j.LoggerFactory
import java.io.IOException
import java.util.function.Consumer

abstract class CheckValueService protected constructor(private val packetName: String)
    : OnlineCommand(packetName.split('/')[1]), Runnable {
    private var interval = 0
    protected lateinit var onChange: TriggerAction
    protected var packet: ServicePacketReaderBase
    private val log = LoggerFactory.getLogger(this::class.java)
    protected open var oldValue:String
        get() = packet.oldValue
        set(value) {
            packet.oldValue = value
        }
    init {
        packet = ServicePacketReaderBase(packetName)
        println("Created service: $packetName")
    }

    private infix fun at(interval: Int) = this.also {
        this.interval = interval
    }

    protected open fun triggerResponce(newValue: Array<String>) = onChange.trigger(newValue)


    private fun sleep(seconds: Int = interval) {
        try {
            Thread.sleep((seconds * 1000).toLong())
        } catch (e: InterruptedException) {
            // TODO Auto-generated catch block
            e.printStackTrace()
        }
    }

    override operator fun invoke(args: Array<String>) {}
    protected abstract operator fun invoke()

    override fun run() {
        initialSleep()
        while (true) {
            log.info("The service $name is starting a check")
            packet = ServicePacketReaderBase(packetName)
            this()
            sleep()
        }
    }

    private fun initialSleep() = sleep(5)

    private infix fun respondWith(onChange: TriggerAction) = this.also{
        it.onChange = onChange
    }

    protected open fun checkValues(oldValue:String) =
        if (data != oldValue) {
            log.debug("$name found a new value: $data")
            this.oldValue = data
            triggerResponce(arrayOf(data))
        } else log.debug("$name detected no changes")

    protected fun navigate() {
        data = getValueFromKey(packet.keyName)
    }
    companion object {
        @JvmStatic
        protected fun createService(service: CheckValueService, onChange:TriggerAction, interval: Int):Unit =
            Thread(service respondWith onChange at interval).start()
    }
}
open fun interface TriggerAction{
fun trigger(a:Array<String>)
}