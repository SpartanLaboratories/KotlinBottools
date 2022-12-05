
package bottools.services

import com.rometools.rome.feed.synd.SyndFeed
import com.rometools.rome.io.FeedException
import com.rometools.rome.io.SyndFeedInput
import com.rometools.rome.io.XmlReader
import java.io.IOException
import java.net.URL
import java.util.function.Consumer

class RssService protected constructor(serviceName: String?) : CheckValueService(serviceName!!) {
    var feed: SyndFeed? = null

    init {
        try {
            feed = SyndFeedInput().build(XmlReader(URL(packet.uRL)))
        } catch (e: IllegalArgumentException) {
            // TODO Auto-generated catch block
            e.printStackTrace()
        } catch (e: FeedException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    public override fun loop() {
        println("Testing rss feed service")
        data = feed!!.entries[0].uri
        checkValues()
    }

    companion object {
        fun createService(serviceName: String, onChange: Consumer<String>, interval: Int) {
            createService(RssService(serviceName), onChange, interval)
        }
    }
}