package bottools.services

import bottools.commands.OnlineCommand
import org.slf4j.LoggerFactory
import java.io.IOException
import java.util.function.Consumer

abstract class CheckValueService protected constructor(private val packetName: String)
    : OnlineCommand(packetName.split('/')[1]), Runnable {
    private var interval = 0
    private lateinit var onChange: Consumer<Array<String>>
    protected var packet: ServicePacketReaderBase
    private val log = LoggerFactory.getLogger(this::class.java)
    init {
        packet = ServicePacketReaderBase(packetName)
        println("Created service: $packetName")
    }

    private infix fun at(interval: Int) = this.also {
        this.interval = interval
    }

    private fun triggerResponce(newValue: Array<String>) = onChange.accept(newValue)


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

    private fun initialSleep() = sleep(10)

    private infix fun respondWith(onChange: Consumer<Array<String>>) = this.also{
        it.onChange = onChange
    }

    protected open fun checkValues(oldValue:String) =
        if (data != oldValue) {
            log.debug("$name found a new value: $data")
            packet.oldValue = data
            triggerResponce(arrayOf(data))
        } else log.debug("$name detected no changes")

    protected fun navigate() {
        data = getValueFromKey(packet.keyName)
    }

    private fun skipLines() {
        packet.skipLineData.forEach { key: String ->
            try {
                skipLinesTo(key)
            } catch (e: IOException) {
                log.error("The service: $name has failed to perform a check")
            }
        }
    }

    companion object {
        @JvmStatic
        protected fun createService(service: CheckValueService, triggerAction: Consumer<Array<String>>, interval: Int) =
            Thread(service respondWith triggerAction at interval).start()
    }
}